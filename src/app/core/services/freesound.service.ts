import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FreesoundService {
  private apiKey = 'f35SGM1MgvbxiIfgGACFgs0tOp9XdoTR1CX7Ya3k'; // Substitua pela sua API Key
  private baseUrl = 'https://freesound.org/apiv2';

  constructor(private http: HttpClient) {}

  searchSound(query: string) {
    const headers = new HttpHeaders({
      Authorization: `Token ${this.apiKey}`
    });

    const params = new HttpParams()
      .set('query', query)
      .set('fields', 'id,name,previews')
      .set('page_size', '1');

    return this.http.get<any>(`${this.baseUrl}/search/text/`, { headers, params })
      .pipe(
        map(response => response.results[0]?.previews['preview-hq-mp3'])
      );
  }
}
