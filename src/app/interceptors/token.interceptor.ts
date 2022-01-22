import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/*
Angular Interceptors technique comes in handy when you need to transform each request data, for instance, send an authorization token header with every HTTP request.
We need to add an additional header to every request and don’t want to modify methods or create base HTTP class.
HTTP request interceptor is a special kind of service that hooks into the request process and allows us to modify request data:
1. HTTP request interceptor is a special kind of service that hooks into the request process and allows us to modify request data:
2. Using the intercept() method we need to clone the original request, modify it, and then call next.handle() to pass the modified request:
3. Register interceptor: Your interceptor should be provided using HTTP_INTERCEPTORS injection token:
4. Ready for intejection

*/


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem(`token`);
    if(userToken!=null){
      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `GutendexryBearer ${userToken}`)
      })
      return next.handle(modifiedReq);
    }

    return next.handle(request);
  }
}
