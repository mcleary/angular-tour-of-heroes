# -*- encoding: utf-8 -*-

import json
from flask import Flask, abort, request
from flask_cors import cross_origin

WEBAPP = Flask(__name__)


class Hero:
    def __init__(self, id, name):
        self.id = id
        self.name = name


class HeroEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Hero):
            return {
                'id': o.id,
                'name': o.name
            }
        else:
            return json.JSONEncoder(o)


def hero_decoder(dct):
    return Hero(dct['id'], dct['name'])


hero_list = [
    Hero(11, 'Mr. Nice'),
    Hero(12, 'Bombasto'),
    Hero(13, 'Celeritas'),
    Hero(14, 'Carlão Hipster'),
    Hero(15, 'Magneto'),
    Hero(16, 'Wolverine'),
    Hero(17, 'Superman')
]


@WEBAPP.route('/', methods=['GET'])
@cross_origin()
def test():
    print("Rota da raiz")
    return json.dumps(hero_list, cls=HeroEncoder)


@WEBAPP.route('/heroes', methods=['GET'])
@cross_origin()
def heroes_list():
    print("Get All Heroes")
    return json.dumps(hero_list, cls=HeroEncoder)


@WEBAPP.route('/heroes/<int:hero_id>', methods=['GET'])
@cross_origin()
def hero_info(hero_id):
    print("Get hero with id %d" % hero_id)
    for h in hero_list:
        if h.id == hero_id:
            return json.dumps(h, cls=HeroEncoder)
    return json.dumps({})


@WEBAPP.route('/heroes/<int:hero_id>', methods=['DELETE'])
@cross_origin()
def delete_hero(hero_id):
    print("Delete hero with id %d" % hero_id)
    try:
        for h in hero_list:
            if h.id == hero_id:
                hero_list.remove(h)
                break
        return json.dumps({})
    except ValueError:
        abort(400)


@WEBAPP.route('/heroes/<int:hero_id>', methods=['PUT'])
@cross_origin()
def update_hero(hero_id):
    print("Updating hero " + str(hero_id))

    # find reference for hero_id
    the_hero = None
    for h in hero_list:
        if h.id == hero_id:
            the_hero = h
            break

    # Get the updated hero data
    hero_json = request.get_json(silent=True)
    hero_obj = Hero(hero_json['id'], hero_json['name'])

    if the_hero is not None:
        print('Updating name from ' + the_hero.name + " " + hero_obj.name)

    if the_hero is not None and hero_obj.id == the_hero.id:
        the_hero.name = hero_obj.name
        return json.dumps(the_hero, cls=HeroEncoder)
    else:
        abort(400)


if __name__ == '__main__':
    WEBAPP.run(host='0.0.0.0', port=5000, debug=True)
