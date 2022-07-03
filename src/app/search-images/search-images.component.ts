import {Component,
        OnInit} from '@angular/core';

import {FlickrService} from '../services/flickr.service';

@Component({
    selector: 'app-search-images',
    templateUrl: './search-images.component.html',
    styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit
{
    images: any = [];
    keyword: string = "";
    tags: Set<string> = new Set();
    nsfw: boolean = false;
    constructor(private flickrService: FlickrService)
    {}

    ngOnInit(): void
    {
    }

    remove_tag(event: any)
    {
        this.tags.delete(event.target.textContent);
    }

    add_tag(event: any)
    {
        this.tags.add(event.target.value.toLowerCase());
    }

    search(event: any)
    {
        this.keyword = event.target.value.toLowerCase();
        if (this.keyword && this.keyword.length > 0)
        {
            this.flickrService.search_keyword(this.keyword, this.tags, this.nsfw)
                .toPromise()
                .then(res => {
                    this.images = res;
                });
        }
    }

    onScroll()
    {
        if (this.keyword && this.keyword.length > 0)
        {
            this.flickrService.search_keyword(this.keyword, this.tags, this.nsfw)
                .toPromise()
                .then(res => {
                    this.images = this.images.concat(res);
                });
        }
    }
}
