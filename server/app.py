from flask import Flask, request

app = Flask(__name__)

# /convert?url=https


@app.route('/convert')
def convert():
    url = request.args.get("url")
    print(url)
    return url


if __name__ == '__main__':
    app.run(debug=True)
