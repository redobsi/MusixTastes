import json
import sys

class ShellCommunication:
    def __init__(self) -> None:
        """
        A class that simplifies the implementation of commands in a shell communication process.
        """
        self.commands = {}
    
    def __send_data(self, data: dict) -> None:
        """
        Private method to send data to the background process.
        
        Args:
            data (dict): The data to be sent as a dictionary.
        """
        if not isinstance(data, dict):
            raise TypeError(f'Expected data of type dict, not {type(data).__name__}')
        # Send data to the background process
        print(json.dumps(data))
        sys.stdout.flush()
        
    def __process(self) -> None:
        """
        Private method to process input commands.
        """
        _input = input()
        cmd, data = [json.loads(_input).get(key) for key in ['command', 'data']] # Of this format => {"command":"name_command", "data":{...}}
        # Get command, execute the command, and send the received data 
        self.__send_data({
            'type' : cmd,
            'data' : self.commands.get(cmd, lambda _:'COMMAND NOT FOUND')(data)
        })
    
    
    def register_command(self, command_name) -> callable:
        """
        A decorator to register a method as a command.
        
        Args:
            command_name (str): The name of the command to register.
        
        Returns:
            callable: The decorator function.
        """
        def decorator(func) -> callable:
            self.commands[command_name] = func
            return func
        return decorator
    
    def loop_process(self) -> None:
        """
        Public method to start an infinite loop for processing commands.
        """
        self.__send_data({
            'type':'check',
            'data': {}
        })
        while True:
            self.__process()
            
#shell_com = ShellCommunication()

#shell_com.loop_process()