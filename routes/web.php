<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//administrator routes
Route::get('admin/', 'HomeController@admin_index')->where( 'path', '^(?!api).*$' );
Route::get('/admin/{path}', 'HomeController@admin_index')->where( 'path', '^(?!api).*$' );

//user routes
Route::get('{path}', 'HomeController@index')->where( 'path', '^(?!api).*$' );
