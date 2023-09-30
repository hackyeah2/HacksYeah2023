from models.log import Log

def log(log:Log):
    with open(f"./logs_store/{log.sessionId}.json", 'a') as f:
        f.write("\n{" + f'"datetime":"{log.timestamp}","sessionId":"{log.sessionId}","message":"{log.message}"' + "}")

