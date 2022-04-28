import base64
import json
import random



# DATA USED FROM:
# https://www.kaggle.com/datasets/kevinbi/toronto-restaurants?select=trt_rest.csv
# https://github.com/fivethirtyeight/data/tree/master/most-common-name
# https://loremfaces.com/

import pandas as pd
import requests

URL_SIGNUP = "http://localhost:8000/accounts/signup/"
URL_LOGIN = "http://localhost:8000/accounts/login/"
URL_REST_ADD = "http://localhost:8000/restaurants/add/"
URL_FOLLOW = "http://localhost:8000/restaurants/follow/"
URL_COMMENTS = "http://localhost:8000/restaurants/"
URL_COMMENTS_APPEND = "/addComment/"
URL_BLOG_ADD = "http://localhost:8000/blogs/create/"
URL_LIKE = "http://localhost:8000/restaurants/"
URL_LIKE_APPEND = "/like/add/"

COMMENTS = ["Service is fast too. Can't go wrong with this place.",
            "They offer an awesome range of fresh aps. I liked dining here. Staff members are always friendly, prices "
            "are reasonable and the spot is always kept clean",
            "The service was top notch and the entrees was to die for",
            "The service and the food were both excellent. I have never had a bad experience and any of "
            "the restaurants",
            "The specialties here is real amazing and would recommend trying these guys out.",
            "I'm confident the food here poisoned me. It's the only food I ate in the last 24 hours that "
            "I did not eat in the proceeding days.",
            "Would give it a zero if I could. Hostess stand was rude. Bartender was rude. Come here if you "
            "want attitude.",
            "Sleepy service, poor food quality, and when we asked why it was like this they stated that their kitchen "
            "was backed up, yet the restaurant was damn near empty.",
            "Took an hour to get food. Food was dry and not cooked well and my friend found hair in her food. "
            "It was a busy night I get it, but worst service I have ever experienced. Go ANYWHERE else"]

LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare blandit enim, vel feugiat ipsum " \
        "porttitor ac. Morbi in semper leo. Phasellus consectetur dui non ex consequat, in egestas dui iaculis. " \
        "Sed vel convallis sapien. Integer fringilla aliquam enim in congue. Nam vulputate vulputate felis, nec " \
        "tristique sem pharetra id. Cras vitae ornare nibh. Mauris ac eros euismod, tincidunt est non, malesuada " \
        "erat. \n" \
        "Nam aliquam volutpat risus sed cursus. Aliquam eget sem eget ipsum scelerisque efficitur. Donec lorem " \
        "tellus, condimentum pulvinar ligula at, lobortis imperdiet orci. Nulla ut ex velit. Nulla laoreet " \
        "venenatis dui, nec eleifend eros efficitur ac. Sed condimentum leo et convallis viverra. Aliquam in " \
        "placerat lacus. Sed congue ultrices libero nec vestibulum. Donec tristique ex sed tortor faucibus lobortis. " \
        "Donec vehicula vehicula elit, id commodo sapien aliquam sit amet. Vestibulum ante ipsum primis in faucibus " \
        "orci luctus et ultrices posuere cubilia curae; Suspendisse mollis sit amet nisi dapibus tempus. Sed in " \
        "porta turpis, non finibus dui. \n" \
        "Ut quis arcu nec ipsum fermentum dignissim. Sed non commodo est. Duis bibendum euismod semper. Nullam " \
        "ornare, odio id porta ornare, velit tortor pulvinar eros, lacinia vestibulum elit elit at nisl. Interdum" \
        " et malesuada fames ac ante ipsum primis in faucibus. Donec luctus luctus dolor, vel facilisis libero " \
        "pulvinar eget. Quisque nisi justo, finibus vel nisi sed, laoreet dignissim lorem. Maecenas lacinia " \
        "consectetur ornare. Vestibulum porttitor nunc vitae aliquam congue. Suspendisse potenti. \n" \
        "Mauris scelerisque gravida auctor. Suspendisse malesuada congue enim in egestas. Aenean vulputate urna " \
        "eget nulla venenatis, ut bibendum mauris bibendum. Suspendisse at egestas est. Nam vulputate feugiat " \
        "egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam vitae molestie ipsum, " \
        "vitae porttitor nulla. Maecenas bibendum, mi a scelerisque eleifend, nunc enim mollis ex, at fringilla " \
        "nulla quam a eros. Proin facilisis sapien non placerat lobortis. Nulla convallis egestas gravida. \n"


def convert_phone(phone):
    for r in (("(", ""), (")", ""), (" ", ""), ("-", "")):
        phone = phone.replace(*r)
    return "+1" + phone


def load_csv():
    first = pd.read_csv('firstNames.csv')
    last = pd.read_csv('lastName.csv')
    restaurants = pd.read_csv('toronto-restaurants.csv')
    restaurants.dropna(subset=['Restaurant Phone'], inplace=True)
    restaurants.dropna(subset=['Restaurant Name'], inplace=True)
    restaurants.dropna(subset=['Restaurant Address'], inplace=True)

    return first, last, restaurants


if __name__ == '__main__':
    ALL_USER_ACCESS = []
    first_names, last_names, rest = load_csv()
    w = 60

    for x in range(w):
        try:
            # SIGNUP
            print(rest['Restaurant Phone'][x])
            username = str(first_names['name'][x] + "_" + last_names['name'][x])
            email = str(first_names['name'][x] + "_" + last_names['name'][x] + "@hotmail.ca")
            data = {"first_name": first_names['name'][x], "last_name": last_names['name'][x], "username": username,
                    "password": "12345678", "password2": "12345678", "email": email}
            signup_resp = requests.post(URL_SIGNUP, data=data)
            print(signup_resp)

            # LOGIN
            data = {"username": username, "password": "12345678"}
            login_resp = requests.post(URL_LOGIN, data=data)
            access = login_resp.json()['access']
            ALL_USER_ACCESS.append(access)
            print(access)

            # ADD RESTAURANTS
            headers = {"Authorization": f"Bearer {access}"}
            data = {"name": rest['Restaurant Name'][x], 'address': rest['Restaurant Address'][x], 'postal': "L5B4N5",
                    "phone": convert_phone(rest['Restaurant Phone'][x])}
            rest_add_resp = requests.post(URL_REST_ADD, data=data, headers=headers)
            print(rest_add_resp.json())

        except:
            w += 1

    w = 60

    for x in range(w):
        for y in range(w):
            try:
                # ADD Followers
                headers = {"Authorization": f"Bearer {ALL_USER_ACCESS[x]}"}
                rest_add_resp = requests.post(URL_FOLLOW + str(y) +"/", headers=headers)
                print(rest_add_resp.json())
            except:
                w += 1
    w = 60
    for x in range(w):
        for y in range(w):
            try:
                # ADD Comments
                headers = {"Authorization": f"Bearer {ALL_USER_ACCESS[x]}"}
                data = {"comment": random.choice(COMMENTS)}
                rest_add_resp = requests.post(URL_COMMENTS + str(y) + URL_COMMENTS_APPEND, data=data, headers=headers)
                print(rest_add_resp.json())
            except:
                w += 1

    w = 60
    for x in range(w):
        for y in range(30):
            try:
                # ADD Blogs
                headers = {"Authorization": f"Bearer {ALL_USER_ACCESS[x]}"}
                data = {"title": "LOREM IPSUM " + str(y), 'description': LOREM}
                rest_add_resp = requests.post(URL_BLOG_ADD, data=data, headers=headers)
                print(rest_add_resp.json())
            except:
                w += 1

    w = 60
    for x in range(w):
        for y in range(w):
            try:
                if random.randint(0, 3) == 1:
                    # ADD RANDOM LIKES TO RESTAURANTS
                    headers = {"Authorization": f"Bearer {ALL_USER_ACCESS[x]}"}
                    rest_add_resp = requests.post(URL_LIKE + str(y) + URL_LIKE_APPEND, headers=headers)
                    print(rest_add_resp.json())
            except:
                w += 1

