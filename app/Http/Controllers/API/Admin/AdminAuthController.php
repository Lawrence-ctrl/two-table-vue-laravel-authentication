<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\AdminPasswordReset;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Notifications\AdminPasswordResetNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Mail;

class AdminAuthController extends Controller
{
    public function login(Request $request) {
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required|min:6',
           ]);
              if(Auth::guard('admin')->attempt(['email'=>$request->email,'password'=>$request->password])) {
                      if(Auth::guard('admin')->user()->email_verified_at !== NULL) {
                        return response()->json([
                            'admin' => Auth::guard('admin')->user(),
                            'adminToken' => Auth::guard('admin')->user()->createToken('token')->accessToken,
                        ],200);
                      }else{
                          return response()->json(['error' => 'Please verify your email','code' => '1'],422);
                      }
              }else{
                  return response()->json(['error' => 'Email and password do not match','code' => '2'],422);
              }
    }

    public function forgotpassword(Request $request) {
        $this->validate($request,[
            'email' => 'required|email'
        ]);
        
        $count =  Admin::where('email',$request->email)->get();
        $admin = Admin::where('email',$request->email)->first();

        $code = Str::random(25);

        if(count($count) > 0) {
            $reset = new AdminPasswordReset();
            $reset->email = $request->email;
            $reset->token = $code;
            $reset->expired_at = Carbon::now()->addMinutes(1);
            $reset->save();
            $admin->notify(new AdminPasswordResetNotification($code));
            return response()->json(200);
        }else{
            return response()->json(['error' => "Your email doesn't not exist in our list!"],422);
        }
    }

    public function fillcode(Request $request) {
        $this->validate($request,[
            'code' => 'required'
        ]);
        $true = AdminPasswordReset::where('token',$request->code)->first();
        if($true == null) {
            return response()->json(['error' => 'Code is wrong'],422);
        }
        $now = Carbon::now()->format('Y-m-d H:i:s');
        if($true->expired_at > $now) {
            return response()->json(200);
        }else{
            return response()->json(['error' => 'Code is expired!'],422);
        }
    }

    public function resetpassword(Request $request) {
        $this->validate($request,[
            'password' => 'required|min:6'
        ]);

        $email = AdminPasswordReset::where('token',$request->token)->first()->email;
        if($email !== null) {
            $admin = Admin::where('email',$email)->update([
                'password' => Hash::make($request->password)
            ]);
            return response()->json(200);
        }
    }

    public function register(Request $request) {
        $this->validate($request,[
            'name' => 'required|min:4|max:20',
            'email' => 'required|email',
            'password' => 'required|min:6',
           ]);
        $admin = new Admin();
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->phone = '09972089188';
        $admin->address = 'North Dagon';
        $admin->password = Hash::make($request->password);

        if($admin->save()) {
            $url = 'http://127.0.0.1:8000/admin/verified?email='.$admin->email.'&&id='.$admin->id;
            $mail = Mail::to($admin->email)->send(new VerifyEmail($admin,$url));
            if(isset($mail)) {
                return response()->json(200);
            }
        }
    }

    public function verify($email,$id) {
        $admin = Admin::where('email',$email)->where('id',$id)->get();
        if(count($admin) > 0) {
            $admin = Admin::find($id);
            $admin->email_verified_at = Carbon::now()->format('Y-m-d H:i:s');
            $admin->save();
            return response()->json(200);
        }else{
            return response()->json(['error' => 'Something went wrong!'],422);
        }
    }
}
