from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator

from accounts.models import User

#https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
class SignUpSerializer(ModelSerializer):
    # owner = serializers.CharField(source='owner.get_full_name', read_only=True)
    # id = serializers.ReadOnlyField()

    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'avatar', 'password', 'password2']



    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        email = validated_data.get('email', '')
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')

        user = User.objects.create(
            username=validated_data['username'],
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(validated_data['password'])
        user.save()

        output = {'username': validated_data['username'], 'email': email, 'first_name': first_name, 'last_name': last_name}

        print(user)
        return user



class ProfileSerializer(ModelSerializer):
    # owner = serializers.CharField(source='owner.get_full_name', read_only=True)
    # id = serializers.ReadOnlyField()

    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'avatar', 'password', 'password2']



    def validate(self, attrs):
        if 'password' in attrs:
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def update(self, instance, validated_data):
        pass



