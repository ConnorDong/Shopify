import pytest
import json


def test_create_route(app, client):
    res = app.test_client().post('/inventory', json={
        "name": "apples",
        "price": "2.00",
        "stock": 300
    })
    assert res.status_code == 200
    id = json.loads(res.get_data())['id']
    # remove mutation
    app.test_client().delete(f'/inventory/{id}')


def test_delete_route(app, client):
    res = app.test_client().post('/inventory', json={
        "name": "apples",
        "price": "2.00",
        "stock": 300
    })
    id = json.loads(res.get_data())['id']
    response = app.test_client().delete(f'/inventory/{id}')
    assert response.status_code == 200


def test_get_route(app, client):
    res = app.test_client().get('/inventory')
    assert res.status_code == 200


def test_edit_route(app, client):
    res = app.test_client().post('/inventory', json={
        "name": "apples",
        "price": "2.00",
        "stock": 300
    })
    id = json.loads(res.get_data())['id']
    resedit = app.test_client().put(f'/inventory/{id}', json={
        "name": "apples2",
        "price": "2.00",
        "stock": 300
    })
    name = json.loads(resedit.get_data())['name']
    assert name == "apples2"
    app.test_client().delete(f'/inventory/{id}')
