import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState(['Welcome to the my Terminal! Type "help" for commands.']);

  type Command = {
    [key: string]: string;
  };  

  const commands : Command= {
    help: 'List all available commands.',
    // Add other commands here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newOutput = [...output, `> ${inputValue}`];

      if (inputValue === 'help') {
        newOutput.push('Available commands:', ...Object.keys(commands).map(cmd => ` - ${cmd}: ${commands[cmd]}`));
      } else if (commands[inputValue]) {
        newOutput.push(commands[inputValue]);
      } else {
        newOutput.push('Unknown command.');
      }

      setOutput(newOutput);
      setInputValue('');
    }
  };

  return (
    <div className="terminal">
      {output.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <div className="input-line">
        <span className="prompt">{'>'}</span>
        <input 
          name="myInput" 
          value={inputValue} 
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
}

export default App;
