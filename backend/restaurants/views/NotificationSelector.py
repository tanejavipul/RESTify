# Global Variables

# RestaurantNotifications
REST_NOTI = 'REST_NOTI'

# OwnerNotifications
OWNER_NOTI = 'OWNER_NOTI'

# RestaurantNotifications Variables
BLOG = 'BLOG'
MENU = 'MENU'

# OwnerNotifications Variables
FOLLOW = 'FOLLOW'
LIKE_REST = 'LIKE_REST'
LIKE_BLOG = 'LIKE_BLOG'
COMMENT = 'COMMENT'



def getRestaurantNotificationTitle(message, rest):
    rest_name = rest.name
    if message == BLOG:
        return rest_name + " added a new blog."
    if message == MENU:
        return rest_name + " made an update to the menu."
    return ""



def getOwnerNotificationTitle(message, user, rest):
    # for now restaurant name not in use
    user_name = user.username
    rest_name = rest.name
    if message == FOLLOW:
        return user_name + " is now following your restaurant."
    if message == LIKE_REST:
        return user_name + " just liked your restaurant."
    if message == LIKE_BLOG:
        return user_name + " just liked your restaurants blog."
    if message == COMMENT:
        return user_name +" just commented on your restaurant."
    return ""