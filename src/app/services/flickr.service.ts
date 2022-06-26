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
    constructor(private http: HttpClient)
    {}

    search_keyword(keyword: string)
    {
        const url = "www.flickr.com/services/rest/?method=flickr.text.echo&name=value";
        const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12`;

        return this.http.get(url + params).pipe(map((res: FlickrOutput) => {
            const urlArr: any = [];
            res.photos.photo.forEach((ph: FlickrPhoto) => {
                const photoObj = {
                    url: `farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
                    title: ph.title
                };
                urlArr.push(photoObj);
            });
            return urlArr;
        }));
    }
}
