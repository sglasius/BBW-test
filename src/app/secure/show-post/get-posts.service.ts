import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { RestResponseModel } from '../../shared/models/rest-response-model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PlaceHolderPostModel } from './models/placeholder-post-model';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  private postUrl = "https://jsonplaceholder.typicode.com/posts/";

    constructor(
      private httpClient: HttpClient,
    ) {}
  
    getPost(postID: number): Observable<RestResponseModel> {
      const url = this.postUrl + postID ;
      return this.httpClient.get(url, { observe: 'response' }).pipe(mergeMap((res: HttpResponse<any>) => {
        const response = new RestResponseModel();
        response.isError = false;
        response.placeHolderPostModel = res.body as PlaceHolderPostModel;
        return of(response);
      }),
      catchError((err: HttpErrorResponse) => {
          console.log(err.error);
          const error = new RestResponseModel();
          error.isError = true;
          error.error = err.error;
          return of(error);
      })
      );
    }
  }