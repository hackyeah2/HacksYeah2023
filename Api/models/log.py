class Log():
    def __init__(self, timestamp,userType,sessionId, message,response):
        self.timestamp = timestamp
        self.userType = userType
        self.sessionId = sessionId
        self.message = message
        self.response = response

    