import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})

export class CreateComponent implements OnInit {
  newPostForm: FormGroup;
  loading = false;
  submitted = false;  
  post: Post = new Post();

  modules: any = {
    syntax: true,
    toolbar:{
      container: [
        ["bold", "italic", "underline", "strike"],        
        [{"list": "ordered"}, {"list": "bullet"}],
        ["blockquote", "code-block"],
        ["link", "image"]
      ]
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) { };

  ngOnInit() {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required],
      description: ['', Validators.required]
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
    this.post.tags = this.f.tags.value.split(',');
    this.post.description = this.f.description.value;

    this.dataService.createPost(this.post)
      .subscribe(data => {
        this.router.navigate([`/post/${data.slug}`]);        
      }
    );
  }

  registerImageHandler(event: any){
    event.getModule('toolbar')
      .addHandler('image', this.imageHandler(event));
      
    setTimeout(() => {
      document.querySelector('button.ql-image')
        .addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById('image-upload').click();
        });
    }, 500);
  }

  imageHandler(editor: any) {
    var formData = new FormData();
    var fileInput = editor.container.querySelector('#image-upload');
    var service = this.dataService;

    if (fileInput === null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/jpeg, image/gif, video/mp4');
        fileInput.classList.add('ql-image');
        fileInput.setAttribute('id', 'image-upload');
        fileInput.style.display = "none";        

        fileInput.addEventListener('change', function () {          
            editor.container.classList.add('uploading');
            if (fileInput.files !== null && fileInput.files[0] !== null) {

                var initial = editor.getSelection().index;

                formData.append('image', fileInput.files[0]);
                service.uploadImage(formData)
                  .subscribe(data => {
                    if(fileInput.files[0].type.indexOf('image') === 0){
                      editor.insertEmbed(initial, 'image', `https://api.mika.house/uploads/${data}`);
                    }
                    
                    editor.setSelection(editor.getLength());
          });
        }
      });
      editor.container.appendChild(fileInput);
    }
  }
}