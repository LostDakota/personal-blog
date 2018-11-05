import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';
import { Delta } from 'quill';
import { HttpClient } from '@angular/common/http';

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

  modules: any = {
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
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private http: HttpClient
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

  registerImageHandler(event: any){
    event.getModule('toolbar').addHandler('image', this.imageHandler(event));
  }

  imageHandler(editor: any){
    debugger;
    var formData = new FormData();
    var fileInput = editor.container.querySelector('input.ql-image[type=file]');

    if (fileInput === null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/jpeg, image/gif, video/mp4');
        fileInput.classList.add('ql-image');
        fileInput.style.display = "none";

        fileInput.addEventListener('change', function () {
            editor.container.classList.add('uploading');
            if (fileInput.files !== null && fileInput.files[0] !== null) {

                var initial = editor.getSelection().index;
                var embed = {};
                var videoControls = {
                    autoplay: false
                };

                editor.insertText(initial, 'Loading...');

                formData.append('image', fileInput.files[0]);
                this.http.post({
                    url: '/api/mediagallery/embed',
                    contentType: false,
                    processData: false,
                    data: formData,
                    type: 'POST',
                    success: function (response) {
                        if (fileInput.files[0].type.indexOf('image') === 0) {
                            embed['image'] = response;
                        } else {
                            embed['video'] = response;
                        }
                        editor.updateContents(
                            new Delta()
                                .retain(initial)
                                .delete(10)
                                .insert(embed, videoControls)
                            , 'user'
                        );
                        editor.container.classList.remove('uploading');
                        var len = editor.getLength();
                        editor.setSelection(len, 0, 'user');
                        formData.delete('image');
                    }
                });
            }
        });
        editor.container.appendChild(fileInput);
    }
    fileInput.click();
  }
}