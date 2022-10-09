import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BookPageComponent } from './book-page/book-page.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { HistoryComponent } from './history/history.component';
import { SearchComponent } from './search/search.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'book-page/:bookId', component: BookPageComponent },
  { path: 'borrowed-books', component: BorrowedBooksComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
