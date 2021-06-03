from flask.cli import AppGroup
from .users import seed_users, undo_users
from .messages import seed_messages, undo_messages
from .collections import seed_collections, undo_collections
from .coins import seed_coins, undo_coins

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_messages()
    seed_coins()
    seed_collections()

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_messages()
    undo_collections()
    undo_coins()
    undo_users()
