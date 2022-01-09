from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import csv
import os


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
api = Api(app)
ma = Marshmallow(app)


class InventoryItemSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "price", "stock")


inventory_item_schema = InventoryItemSchema()
inventory_items_schema = InventoryItemSchema(many=True)


class InventoryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)


class Inventory(Resource):
    def get(self):
        items = InventoryItem.query.all()
        return inventory_items_schema.dump(items)

    def post(self):
        new_inventory_item = InventoryItem(
            name=request.json['name'],
            price=request.json['price'],
            stock=request.json['stock']
        )
        db.session.add(new_inventory_item)
        db.session.commit()
        return inventory_item_schema.dump(new_inventory_item)


class ModifyInventory(Resource):
    def put(self, inventory_id):
        item = InventoryItem.query.get_or_404(inventory_id)
        name = request.json['name']
        price = request.json['price']
        stock = request.json['stock']
        item.name = name
        item.price = price
        item.stock = stock

        db.session.commit()

        return inventory_item_schema.dump(item)

    def delete(self, inventory_id):
        effected_rows = InventoryItem.query.filter(InventoryItem.id == inventory_id).delete()
        if effected_rows == 0:
            return "id not found", 404
        db.session.commit()
        return 'Successfully Deleted'


class InventoryCSV(Resource):
    def get(self):
        items = InventoryItem.query.all()
        if os.path.exists('data.csv'):
            os.remove('data.csv')
        with open('data.csv', 'w',  newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['name', 'price', 'stock'])
            for item in items:
                writer.writerow([item.name, item.price, item.stock])
        if os.path.exists('data.csv'):
            return send_from_directory('./', "data.csv")
        return "Cannot create CVS", 404


api.add_resource(Inventory, '/inventory')
api.add_resource(InventoryCSV, '/inventory/csv')
api.add_resource(ModifyInventory, '/inventory/<inventory_id>')

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
