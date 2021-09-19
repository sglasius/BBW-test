import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestResponseModel } from 'src/app/shared/models/rest-response-model';
import { GetPostsService } from "./get-posts.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MappingModel } from './models/mapping-model';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})

export class ShowPostComponent implements OnInit {
  postIdToVideoIdList: Array<MappingModel> = [];
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
  showPlaceHolder: boolean = true;
  placeholderBody: string;
  safeSrc: SafeResourceUrl;

  constructor(
    private getPostsService: GetPostsService,
    private sanitizer: DomSanitizer,
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
    // check if postId is number and if it is in the mappinglist
    if (typeof +this.postId === "number" && !isNaN(+this.postId)) {
      this.isNumber = true;
      if (this.postIdToVideoIdList.some(obj => obj.postId == this.postId)) {
        this.isNumberValid = true
        this.showPlaceHolder = false;
        this.getPostById(this.postId);
        var index = this.postIdToVideoIdList.findIndex(obj => obj.postId == this.postId);
        this.setSafeVideoUrl(this.postIdToVideoIdList[index].videoId);
      }
      else {
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
        var n = this.mappingCSV.split("\n");
        for (var x in n) {
          let customObj = new MappingModel();
          n[x] = n[x];
          console.log("splitting" + n[x]);
          customObj.postId = Number(n[x].substr(0, n[x].indexOf(',')));
          customObj.videoId = Number(n[x].substr(n[x].lastIndexOf(',')).replace(/['"]+/g, '').replace(/[,]+/g, ''));
          this.postIdToVideoIdList.push(customObj);
        }
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

  // set video url with id and sanitize
  setSafeVideoUrl(videoID: number) {
    this.id = Number(videoID);
    const url = this.videoUrl + videoID + ".html?inheritDimensions=true";
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
