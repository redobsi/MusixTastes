from modules.custom_firebase_sdk import CustomFirebaseSDK
from modules.process_com import ShellCommunication


class CustomFirebaseShell():
    def __init__(self, database_url: str, certification_path: str) -> None:
        """
        A custom Firebase shell for interacting with the Firebase Realtime Database through a command-line interface.

        Args:
        - database_url (str): The URL of the Firebase Realtime Database.
        - certification_path (str): The file path to the service account credentials JSON file.
        """
        self.shell_com = ShellCommunication()
        self.firebaseSDK = CustomFirebaseSDK(database_url, certification_path)
        self.register_all()
    
    def register_all(self) -> None:
        """
        Register all commands available in the Firebase shell.
        """
        @self.shell_com.register_command('set')
        def set_value(data: dict) -> None:
            """
            Set a value in the Firebase Realtime Database.

            Args:
            - data (dict): Data to be set in the database.

            Returns:
            - None
            """
            return f'Set! The data is {data}'
        
        @self.shell_com.register_command('BASIC_GET')
        def get_value(data: dict) -> None:
            """
            Get data from the Firebase Realtime Database.

            Args:
            - data (dict): Additional data for the command.

            Returns:
            - Data retrieved from the database.
            """
            return self.firebaseSDK.get_data()
    
if __name__ == '__main__':
    custom_firebase_shell = CustomFirebaseShell(
    "https://musixtastes-default-rtdb.firebaseio.com/",
    "scripts/modules/certification.json"
    ).shell_com.loop_process()