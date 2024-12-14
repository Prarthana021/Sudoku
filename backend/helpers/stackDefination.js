// Akash & Prarthana
class StackNode {
  constructor(grid, booleanValue) {
    this.grid = grid;
    this.booleanValue = booleanValue;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }
  // @params(board, T/F)
  push(grid, booleanValue) {
    const newNode = new StackNode(grid, booleanValue);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const poppedNode = this.top;
    this.top = poppedNode.next;
    this.size--;

    return { grid: poppedNode.grid, booleanValue: poppedNode.booleanValue };
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return { grid: this.top.grid, booleanValue: this.top.booleanValue };
  }

  getSize() {
    return this.size;
  }
}

export { Stack, StackNode };

class StackNode {
    constructor(grid, booleanValue) {
      this.grid = grid;
      this.booleanValue = booleanValue;
      this.next = null;
    }
  }
  
  class Stack {
    constructor() {
      this.top = null;
      this.size = 0;
    }
  
    isEmpty() {
      return this.size === 0;
    }
    // @params(board, T/F)
    push(grid, booleanValue) {
      const newNode = new StackNode(grid, booleanValue);
      newNode.next = this.top;
      this.top = newNode;
      this.size++;
    }
  
    pop() {
      if (this.isEmpty()) {
        return null;
      }
  
      const poppedNode = this.top;
      this.top = poppedNode.next;
      this.size--;
  
      return { grid: poppedNode.grid, booleanValue: poppedNode.booleanValue };
    }
  
    peek() {
      if (this.isEmpty()) {
        return null;
      }
  
      return { grid: this.top.grid, booleanValue: this.top.booleanValue };
    }
  
    getSize() {
      return this.size;
    }
  }
  
  export { Stack, StackNode };
  constructor(grid, booleanValue) {
    this.grid = grid;
    this.booleanValue = booleanValue;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }
  // @params(board, T/F)
  push(grid, booleanValue) {
    const newNode = new StackNode(grid, booleanValue);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const poppedNode = this.top;
    this.top = poppedNode.next;
    this.size--;

    return { grid: poppedNode.grid, booleanValue: poppedNode.booleanValue };
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return { grid: this.top.grid, booleanValue: this.top.booleanValue };
  }

  getSize() {
    return this.size;
  }
}

export { Stack, StackNode };
