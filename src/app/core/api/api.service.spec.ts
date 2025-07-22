// src/app/core/api/api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Course } from '../../shared/models/course.model';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;
  const baseUrl = 'http://localhost:3000/courses';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getCourses() doit GET /courses et renvoyer un tableau de Course', () => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Titre A',
        description: 'Desc A',
        imageUrl: 'imgA.png',
        videoUrl: 'urlA.mp4',
        duration: 10,
      },
    ];
    service.getCourses().subscribe((cs) => expect(cs).toEqual(mockCourses));
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('getCourse(id) doit GET /courses/:id et renvoyer un Course', () => {
    const mock: Course = {
      id: '42',
      title: 'Titre X',
      description: 'Desc X',
      imageUrl: 'imgX.png',
      videoUrl: 'urlX.mp4',
      duration: 5,
    };
    // on passe l'id en string
    service.getCourse('42').subscribe((c) => expect(c).toEqual(mock));
    const req = http.expectOne(`${baseUrl}/42`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('createCourse() doit POST /courses et renvoyer le Course créé', () => {
    const newCourse: Course = {
      id: '99',
      title: 'Nouveau',
      description: 'Desc Nouveau',
      imageUrl: 'imgNew.png',
      videoUrl: 'urlNew.mp4',
      duration: 15,
    };
    service.createCourse(newCourse).subscribe((c) => expect(c).toEqual(newCourse));
    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });

  it('updateCourse() doit PUT /courses/:id et renvoyer le Course mis à jour', () => {
    const updated: Course = {
      id: '5',
      title: 'Modifié',
      description: 'Desc Modifiée',
      imageUrl: 'imgUpd.png',
      videoUrl: 'urlUpd.mp4',
      duration: 20,
    };
    // on passe l'id en string
    service.updateCourse('5', updated).subscribe((c) => expect(c).toEqual(updated));
    const req = http.expectOne(`${baseUrl}/5`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updated);
    req.flush(updated);
  });

  it('deleteCourse() doit DELETE /courses/:id et renvoyer void', () => {
    // on passe l'id en string
    service.deleteCourse('7').subscribe((res) => expect(res).toBeUndefined());
    const req = http.expectOne(`${baseUrl}/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
