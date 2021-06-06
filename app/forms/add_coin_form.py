from flask_wtf import FlaskForm
from wtforms import StringField, FileField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError

# ! I will need another Fields, like select, checkbox


class AddCoinForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()]),
    reversePhoto = FileField(),
    obversePhoto = FileField(),
    country = StringField('country'),
    isCollectible = StringField('isCollectible'),
    series = StringField('series'),
    year = StringField('year'),
    mintage = StringField('mintage'),
    value = StringField('value'),
    composition = StringField('composition'),
    weight = StringField('weight'),
    diameter = StringField('diameter'),
    thickness = StringField('thickness'),
    shape = StringField('shape'),
    orientation = StringField('orientation'),
    submit = SubmitField('Add coin')
