import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { bookmarks } from 'src/app/data/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent implements OnInit {
  bookmarks: any = bookmarks;

  addForm!: FormGroup;

  isNewCategory: boolean = false;

  selectedCategoryId!: number;
  selectedCategoryName: String = '';

  selectedTitle: String = '';
  selectedUrl: String = '';
  selectedCategory: String = '';

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    //form
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      url: ['', [Validators.required]],
      category: ['', [Validators.required]],
      newCategory: ['', [Validators.required]],
    });

    this.bookmarks = bookmarks;

    console.log(bookmarks);
  }

  open(content: any) {
    this.modalService.open(content);
  }

  onSubmit(form: FormGroup) {
    if (form.value.newCategory == '' && this.isNewCategory == false) {
      bookmarks.map((item) => {
        if (item.name == form.value.category) {
          console.log('Email11111', form.value);
          this.selectedCategoryId = item.id;
          this.selectedCategoryName = item.name;
          let newData = {
            id: this.bookmarks[this.selectedCategoryId].data.length,
            title: form.value.title,
            url: form.value.url,
            category: form.value.category,
          };
          this.bookmarks[this.selectedCategoryId].data = [
            ...this.bookmarks[this.selectedCategoryId].data,
            newData,
          ];
          localStorage.setItem('bookmarks', this.bookmarks);
          // this.bookmarks[this.selectedCategoryId].data.push = {
          //   id: this.bookmarks[this.selectedCategoryId].data.length,
          //   title: form.value.title,
          //   url: form.value.url,
          //   category: form.value.category,
          // };

          console.log('data', this.bookmarks);
        }
        console.log('id', this.selectedCategoryId);
        console.log('nmae', this.selectedCategoryName);
      });
    } else if (form.value.newCategory != '' && this.isNewCategory == true) {
      let newItem = {
        id: bookmarks.length,
        name: form.value.newCategory,
        data: [
          {
            id: 0,
            title: form.value.title,
            url: form.value.url,
            category: form.value.category,
          },
        ],
      };
      this.bookmarks = [...this.bookmarks, newItem];
      localStorage.setItem('bookmarks', this.bookmarks);

      // this.bookmarks.push =
    }
    console.log('data', this.bookmarks);
    console.log('Email', form.value);
    console.log('Phone', form.value.phone);
    console.log('Password', form.value.password);
  }

  toggleCategory() {
    this.isNewCategory = !this.isNewCategory;
  }

  showDetails(title: any, url: any, category: any) {
    this.selectedTitle = title;
    this.selectedUrl = url;
    this.selectedCategory = category;
  }
}
