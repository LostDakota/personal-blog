import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  newPostForm: FormGroup;
  loading = false;
  submitted = false;  
  post: Post = new Post();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  get f() {return this.newPostForm.controls;}

  onSubmit() {
    this.submitted = true;

    if(this.newPostForm.invalid){
      return;
    }

    this.loading = true;

    this.post.title = this.f.title.value;
    this.post.content = this.f.content.value;

    this.dataService.createPost(this.post)
      .subscribe(data => {
        this.router.navigate(['/blog/' + data._id]);
      },
      error => {
        this.loading = false;
      }
    );
  }
}
