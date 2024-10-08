def charset = ('A'..'Z' + 'a'..'z' + '0'..'9').join()
def randomString = (1..5).collect { charset[new Random().nextInt(charset.length())] }.join()
vars.put("randomString", randomString)