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


def getRestaurantNotificationTitle(message):
    if message == BLOG:
        return " added a new blog."
    if message == MENU:
        return " made some updates to their menu."



def getOwnerNotificationTitle(message):
    if message == FOLLOW:
        return " is now following your restaurant."
    if message == LIKE_REST:
        return " just liked your restaurant."
    if message == LIKE_BLOG:
        return " just liked your restaurants blog."
    if message == COMMENT:
        return " just commented on your restaurant."
