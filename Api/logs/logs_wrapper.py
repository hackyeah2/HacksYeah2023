import os
from models.log import Log


def log(log: Log):
    absolute_path = os.path.join(os.path.dirname(__file__),
                                 f"store/{log.sessionId}.json")

    with open(absolute_path, 'a') as f:
        f.write(
            "\n{" + f'"datetime":"{log.timestamp}","sessionId":"{log.sessionId}","message":"{log.message}","response":"{log.response}"' + "}")
