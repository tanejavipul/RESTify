from django.core.validators import validate_email
from django.shortcuts import redirect
from rest_framework import serializers, request
from rest_framework.reverse import reverse
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from accounts.models import User


# https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
class SignUpSerializer(ModelSerializer):
    # owner = serializers.CharField(source='owner.get_full_name', read_only=True)
    # id = serializers.ReadOnlyField()

    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'phone', 'last_name', 'email', 'avatar', 'password', 'password2']

    def validate(self, attrs):
        if 'email' in attrs:
            try:
                validate_email(attrs['email'])
            except:
                raise serializers.ValidationError({"Email Error": "Enter Valid Email"})

        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        email = validated_data.get('email', '')
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')
        phone = validated_data.get('phone', '')


        user = User.objects.create(
            username=validated_data['username'],
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
        )

        user.set_password(validated_data['password'])
        user.save()


        print(user)
        return user


class ProfileSerializer(ModelSerializer):
    # owner = serializers.CharField(source='owner.get_full_name', read_only=True)
    # id = serializers.ReadOnlyField()

    username = serializers.CharField(read_only=True, required=False)  # username will only be printed out
    old_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    new_password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'phone', 'avatar', 'old_password', 'new_password', 'new_password2']

    def validate(self, attrs):
        if 'email' in attrs:
            try:
                validate_email(attrs['email'])
            except:
                raise serializers.ValidationError({"Email Error": "Enter Valid Email"})

        if 'old_password' in attrs and 'new_password' not in attrs:
            raise serializers.ValidationError({"Password Error": "New Password Not Provided"})

        if 'new_password' in attrs:
            if not self.instance.check_password(attrs['old_password']):
                raise serializers.ValidationError({"Password Error": "Old Password Incorrect."})
            if len(attrs['new_password']) < 8:
                raise serializers.ValidationError({"Password Error": "Password To Short."})
            if 'new_password2' not in attrs or attrs['new_password'] != attrs['new_password2']:
                raise serializers.ValidationError({"Password Error": "New Password Field's Did Not Match."})
        return attrs

    def update(self, instance, validated_data):
        if 'old_password' in validated_data and 'new_password' in validated_data:
            instance.set_password(validated_data['new_password'])

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()

        return instance




