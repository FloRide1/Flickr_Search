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
}
