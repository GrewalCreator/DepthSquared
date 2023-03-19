from flask import Flask, render_template, request, make_response,send_file
import os
import glob
from werkzeug.serving import make_server
import threading
import posixpath
import urllib.parse
import requests
import io
import wget
import codecs


default_port = 6060


class ServerThread(threading.Thread):

    def __init__(self, app, port):
        threading.Thread.__init__(self)
        self.port = port
        self.srv = make_server('127.0.0.1', port, app)
        self.ctx = app.app_context()
        self.ctx.push()

    def run(self):
        print('starting server on port:', self.port)
        self.srv.serve_forever()

    def shutdown(self):
        self.srv.shutdown()


app = Flask('myapp')


@app.get("/")
def hello():
    path = '../public/views/'
    # A wee bit o'html

    return send_file(path+'testHTML.html')
@app.route('/scripts/test.js')
def sendJs():
    return send_file('../public/scripts/test.js')
@app.route('/image', methods=['GET'])
# we are given a url, download the image from the url and serve a webpage containing the canvas element
def process_input():
    print("inside the function")
    gettype = request.args.get("type")
    geturl = request.args.get("url")
    print(geturl)
    # Check for existing image
    clearFlag = True
    files = glob.glob('./input/*')
    for f in files:
        if geturl.lower().split("/")[-1] in f:
            clearFlag = False
    if clearFlag:
        print("Generating new image!")
        files = glob.glob('./input/*')
        for f in files:
            print(f'removing {f}')
            os.remove(f)

        files = glob.glob('./output/*')
        for f in files:
            print(f'removing {f}')
            os.remove(f)

        print("Downloading..")
        img = wget.download(geturl, out='./input/')
        os.system('python generate.py --cpu')

    path = './output/'
    filename = None
    for i in os.listdir(path):
        print(gettype, i)
        if gettype.lower() in i.lower():
            print(filename)
            filename = i
    if filename == None:
        return None
    return send_file(path+filename, mimetype="image/gif")
    # return f'<h1>{filename}</h1>'


def start_server(port=default_port):
    global server
    if 'server' in globals() and server:
        print('stopping server')
        stop_server()

    server = ServerThread(app, port)
    server.start()


def stop_server():
    global server
    if server:
        server.shutdown()
        server = None


start_server()
