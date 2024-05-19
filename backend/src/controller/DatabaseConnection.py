import psycopg2
from psycopg2 import pool

class Database:
    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = super(Database, cls).__new__(cls)
            cls.__instance._initialized = False
        return cls.__instance

    def __init__(self):
        if not self._initialized:
            self.connection_pool = psycopg2.pool.SimpleConnectionPool(
                1, 20,  # Minimum 1 connection, maximum 20 connections
                user="an7008",
                password="4kxawtib",
                host="pgserver.mau.se",
                port="5432",
                database="g16_mini_project"
            )
            self._initialized = True  # Mark this instance as initialized

    @staticmethod
    def get_instance():
        if Database.__instance is None:
            Database()
        return Database.__instance

    def get_connection(self):
        return self.connection_pool.getconn()

    def return_connection(self, connection):
        self.connection_pool.putconn(connection)

    def close_all_connections(self):
        self.connection_pool.closeall()
