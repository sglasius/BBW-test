import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RestResponseModel } from 'src/app/shared/models/rest-response-model';
import { GetPostsService } from "./get-posts.service";

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {

  public postForm: FormGroup;
  postId: number;
  private videoUrl = "//demo.bbvms.com/p/default/c/";
  id: number;
  isNumber: boolean = true;
  csvFile: string;
  fileReaded: any;
  mappingCSV: string;
  isNumberValid: boolean = true;
  placeholderTitle: string;
  showPlaceHolder: boolean= true;
  placeholderBody: string;

  constructor(
    private getPostsService: GetPostsService,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.postForm = this.formBuilder.group({
      postId: ''
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  // Normally I would use formcontroll, but quick and dirty
  // Also because of mapping file not containing all the numbers
  clickme() {
    this.showPlaceHolder = true;
    this.postId = this.postForm.get('postId')?.value;
    this.postForm.get('postId');
    // if (typeof +this.postId === "number" && !isNaN(+this.postId)){
    if (typeof +this.postId === "number" && !isNaN(+this.postId)) {
      this.isNumber = true;

      // vies
      if (this.mappingCSV.includes(this.postId + ",")) {
        console.log("JEEJ");
        this.isNumberValid = true
        this.showPlaceHolder = false;
        this.getPostById(this.postId);
      }
      else {
        console.log("FAIL");
        this.isNumberValid = false

      }
    }
    else {
      this.isNumber = false
    }
  }
  
  // Load mapping csv
  fetchData() {
    fetch('../../../assets/static/mapping.csv')
      .then(response => response.text())
      .then(data => {
        // Do something with your data
        console.log(data);
        this.mappingCSV = data;
      });
  }

  getPostById(postId: number) {
    console.log("PostID = " + postId);
    this.getPostsService.getPost(postId).subscribe((response: RestResponseModel) => {
      if (response.error) {
        console.log("Data could not be loaded " + response.error.reason);
      }
      else {
        this.placeholderTitle = response.placeHolderPostModel.title;
        this.placeholderBody = response.placeHolderPostModel.body;
      }
    });

  }

  // Get video with id 
  getVideoUrl(videoID: string): string {
    this.id = Number(videoID);
    const url = this.videoUrl + videoID + ".html?inheritDimensions=true";
    return url;

  }

}
