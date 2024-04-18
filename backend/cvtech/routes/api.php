<?php

use App\Http\Controllers\CvtechController;
use App\Http\Controllers\CvtechAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('cvtech')->group(function () {
    Route::get('/ids', [CvtechController::class, 'getIds']);
    Route::get('/{id}', [CvtechController::class, 'edit']);
    Route::post('/create', [CvtechController::class, 'store']);
    Route::put('/edit/{id}', [CvtechController::class, 'update']);
    Route::delete('/delete/{id}', [CvtechController::class, 'destroy']);
    

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('cvtech')->group(function () {
    Route::post('/login', [CvtechAuthController::class, 'login']);
    Route::post('/logout', [CvtechAuthController::class, 'logout'])->middleware('auth:sanctum');
});
