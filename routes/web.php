<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/feature');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])->group(function () {
        Route::get('/user', [UserController::class, 'index'])
            ->name('user.index');

        Route::get('/user/{user}/edit', [UserController::class, 'edit'])
            ->name('user.edit');
        Route::put('/user/{user}', [UserController::class, 'update'])
            ->name('user.update');
    });

    Route::middleware([
        'verified',
        sprintf(
            'role:%s|%s|%s',
            RolesEnum::User->value,
            RolesEnum::Commenter->value,
            RolesEnum::Admin->value
        )
    ])->group(function () {
        Route::resource('feature', FeatureController::class)
            ->except(['index', 'show'])
            ->middleware('can:' . PermissionsEnum::ManageFeatures->value);

        Route::get('/feature', [FeatureController::class, 'index'])
            ->name('feature.index');

        Route::get('/feature/{feature}', [FeatureController::class, 'show'])
            ->name('feature.show');

        Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
        Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

        Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            ->name('comment.store')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);;
        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->name('comment.destroy')
            ->middleware('can:' . PermissionsEnum::ManageComments->value);
    });
});

Route::fallback(function () {
    abort(404);
});

require __DIR__ . '/auth.php';
