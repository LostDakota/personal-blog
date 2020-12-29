import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScriptService } from '../services/dom.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  post$: Post = new Post();
  isAuthenticated: boolean;
  tempTags: string;

  modules: any = {
    syntax: true,
    toolbar:{
      container: [
        ["bold", "italic", "underline", "strike"],        
        [{"list": "ordered"}, {"list": "bullet"}],
        [{"align": []}],
        ["blockquote", "code-block"],
        ["link", "image"]
      ]
    }
  } 

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private ScriptService: ScriptService
  ) { };

  ngOnInit() {
    this.ScriptService.injectScripts();
    this.ScriptService.injectQuillStyles();
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.data.getPost(this.route.snapshot.paramMap.get('slug'))
      .subscribe(
        data => {
          this.post$ = data;
          this.tempTags = data.tags.join(',');
        }
      );
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.updateForm.invalid){
      return;
    }

    this.loading = true;

    this.post$.title = this.f.title.value;
    this.post$.content = this.f.content.value;
    this.post$.tags = this.f.tags.value.split(',');
    this.post$.description = this.f.description.value;

    this.data.updatePost(this.post$)
      .subscribe(data => {
        this.router.navigate([`/post/${data.slug}`]);
      });
  }
}
