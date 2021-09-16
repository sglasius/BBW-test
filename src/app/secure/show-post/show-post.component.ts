import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
  public postForm:FormGroup;
  postId: string;
  private videoUrl = "//demo.bbvms.com/p/default/c/";
  constructor( private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      postId: ''
    });
  }
  clickme() {
    this.postId=this.postForm.get('postId')?.value;
    console.log('it does nothing', this.postForm.get('postId'));
  }

  ngOnInit(): void {
  }

  getPostById(postId:string) {

  }

       // Get video with id 
    getVideoUrl(videoID: string): string {
      const url = this.videoUrl + videoID + ".html?inheritDimensions=true";
      return url;

    }

}
