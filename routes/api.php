<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/admin/login','API\Admin\AdminAuthController@login');
Route::post('/admin/forgotpassword','API\Admin\AdminAuthController@forgotpassword');
Route::post('/admin/fillcode','API\Admin\AdminAuthController@fillcode');
Route::post('/admin/resetpassword','API\Admin\AdminAuthController@resetpassword');
Route::post('/admin/register','API\Admin\AdminAuthController@register');
Route::get('/admin/verified/{email}/{id}','API\Admin\AdminAuthController@verify');