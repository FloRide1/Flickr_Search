import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

export interface FlickrPhoto {
    farm: string;
    id: string;
    secret: string;
    server: string;
    title: string;
}

export interface FlickrOutput {
    photos: {
        photo: FlickrPhoto[];
    };
}

@Injectable({
    providedIn: 'root'
})
export class FlickrService
{
    prev_keyword: string = "";
    curr_page: number = 1;

    constructor(private http: HttpClient)
    {}

    has_key()
    {
        if (environment.flickr.key.length === 0)
            return false;
        return true;
    }

    search_keyword(keyword: string, tags: Set<string> = new Set(), nsfw: boolean = false, common: boolean = false, gallery: boolean = false, getty: boolean = false)
    {
        if (this.prev_keyword === keyword)
            this.curr_page++;
        else
            this.curr_page = 1;
        this.prev_keyword = keyword;

        const url = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
        const params = `&api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.curr_page}`;
        const p_tags = tags.size != 0 ? "&tags=" + Array.from(tags).join(";") : "";
        const p_nsfw = "&safe_search=" + (nsfw ? "3" : "1");
        const p_common = common ? "&is_common=true" : "";
        const p_gallery = gallery ? "&is_gallery=true" : "";
        const p_getty = getty ? "&is_getty=true" : "";

        const final_url: string = url + params + p_tags + p_nsfw + p_common + p_gallery + p_getty;
        console.log(final_url);
        return this.http.get(final_url).pipe(map((res: any) => {
            const urlArr: any = [];
            res.photos.photo.forEach((ph: FlickrPhoto) => {
                const photoObj = {
                    url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
                    title: ph.title
                };
                urlArr.push(photoObj);
            });
            return urlArr;
        }));
    }
}
