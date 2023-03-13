from django import forms

class LoginForm(forms.Form):
    username    = forms.CharField(label="ユーザーネーム")
    email       = forms.EmailField(label="メールアドレス")
    password    = forms.CharField(label="パスワード", widget=forms.PasswordInput())
