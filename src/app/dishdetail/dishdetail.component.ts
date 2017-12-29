import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  
    dish: Dish;
    dishcopy = null;
    dishIds: number[];
    prev: number;
    next: number;

    commentForm: FormGroup;
    comment: Comment;

    errMsg: string;

    visibility = 'shown';

    formErrors = {
      'author': '',
      'comment': ''
    };
  
    validationMessages = {
      'author': {
        'required':      'Author is required.',
        'minlength':     'Author must be at least 2 characters long.',
        'maxlength':     'Author cannot be more than 25 characters long.'
      },
      'comment': {
        'required':      'Comment is required.'
      }
    };
  
    constructor(private dishService: DishService,
      private route: ActivatedRoute,
      private location: Location, 
      private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL) { }
  
    ngOnInit() {

      this.createForm();

      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
        errMsg => this.errMsg = <any>errMsg);
      
        this.route.params
          .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); })
          .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
            errmess => { this.dish = null; this.errMsg = <any>errmess; });

      let id = +this.route.snapshot.params['id'];
      this.dishService.getDish(id).subscribe(dish => this.dish = dish,
        errMsg => this.errMsg = <any>errMsg);
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  
    goBack(): void {
      this.location.back();
    }

    //Comment form
    createForm(): void {
      this.commentForm = this.fb.group({
        rating: ['5', Validators.required ],
        comment: ['', Validators.required ],
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        date: [new Date]
      });

      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now
    }

    onSubmit() {
      this.comment = this.commentForm.value;
      this.comment.date = new Date().toISOString();
      this.dishcopy.comments.push(this.comment);
      this.dishcopy.save()
        .subscribe(dish => { this.dish = dish; console.log(this.dish); });
      this.commentForm.reset({
        rating: '5',
        comment: '',
        author: '',
        date: new Date
      });
    }

    sliderChange(event){
      this.commentForm.controls['rating'].setValue(event.value);
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  
  }
