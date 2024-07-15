import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  formModel: any = {
    firstname: '',
    lastname: '',
    email: ''
  };

  submissions: any[] = []; // Array to hold all form submissions
  editingIndex: number | null = null;

  ngOnInit(): void {
    this.loadSubmissions(); // Load submissions from localStorage on component initialization
  }

  onSubmit(form: NgForm) {
    if (this.editingIndex !== null) {
      this.submissions[this.editingIndex] = { ...form.value };
      this.editingIndex = null;
    } else {
      this.submissions.push({ ...form.value });
    }
    this.saveSubmissions(); // Save submissions to localStorage after adding/editing
    form.resetForm();
  }

  onEdit(index: number) {
    this.formModel = { ...this.submissions[index] };
    this.editingIndex = index;
  }

  onDelete(index: number) {
    this.submissions.splice(index, 1);
    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.formModel = {
        firstname: '',
        lastname: '',
        email: ''
      };
    }
    this.saveSubmissions(); // Save submissions to localStorage after deletion
  }

  saveSubmissions() {
    localStorage.setItem('submissions', JSON.stringify(this.submissions));
  }

  loadSubmissions() {
    const submissions = localStorage.getItem('submissions');
    if (submissions) {
      this.submissions = JSON.parse(submissions);
    }
  }
}
