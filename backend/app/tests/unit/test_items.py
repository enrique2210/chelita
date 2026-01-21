import pytest

from pydantic import ValidationError

from app.crud.item import item as crud_item
from app.schemas.item import ItemCreate, Item


def test_create_item(db):
    item_dict = {
        "name": "string",
        "last_name": "string",
        "age": 22,
        "email": "user@example.com",
        "phone": "221022"
    }
    item = Item(**item_dict)
    result = crud_item.create(db, obj_in=item)

    assert result.document_code is not None


def test_create_item_missing_fields(db):
    item_dict = {
        "name": "string",
        "email": "user@example.com",
        "phone": "221022"
    }

    with pytest.raises(ValidationError) as exc:
        Item(**item_dict)

    errors = exc.value.errors()
    amount_missing_type = len([err for err in errors if err["type"] == "missing"])

    assert amount_missing_type == 2


def test_create_item_age_wrong(db):
    item_dict = {
        "name": "string",
        "last_name": "string",
        "age": 160,
        "email": "user@example.com",
        "phone": "221022"
    }

    with pytest.raises(ValidationError) as exc:
        Item(**item_dict)

    errors = exc.value.errors()
    amount_age_type = len([err for err in errors if err["type"] == "less_than_equal"])

    assert amount_age_type == 1
