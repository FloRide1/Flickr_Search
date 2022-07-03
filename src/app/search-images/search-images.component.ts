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
    is_common: boolean = false;
    is_gallery: boolean = false;
    is_on_sale: boolean = false;
    has_key: boolean = true;
    constructor(private flickrService: FlickrService)
    {}

    ngOnInit(): void
    {
        this.has_key = this.flickrService.has_key();
    }

    search()
    {
        if (this.keyword && this.keyword.length > 0)
        {
            this.flickrService.search_keyword(this.keyword, this.tags, this.nsfw, this.is_common, this.is_gallery, this.is_on_sale)
                .toPromise()
                .then(res => {
                    this.images = res;
                });
        }
    }

    on_key_change(event: any)
    {
        this.keyword = event.target.value.toLowerCase();
        this.search();
    }

    add_tag(event: any)
    {
        this.tags.add(event.target.value.toLowerCase());
        this.search();
    }

    remove_tag(event: any)
    {
        this.tags.delete(event.target.textContent);
        this.search();
    }

    onScroll()
    {
        if (this.keyword && this.keyword.length > 0)
        {
            this.flickrService.search_keyword(this.keyword, this.tags, this.nsfw, this.is_common, this.is_gallery, this.is_on_sale)
                .toPromise()
                .then(res => {
                    this.images = this.images.concat(res);
                });
        }
    }
}
