from DatabaseConnection import Database

def add_product(name, p_type, price, image_url, production_date, color, condition, seller):

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("INSERT INTO product (name, type, price, image, production_date, color, condition, seller) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                       (name, p_type, price, image_url, production_date, color, condition, seller))

        connection.commit()
        cursor.close()

        db_instance.return_connection(connection)
    except Exception as e:
        print(f"Failed to retrieve data: {e}")
    finally:
        if 'db_instance' in locals() and db_instance:
            db_instance.close_all_connections()