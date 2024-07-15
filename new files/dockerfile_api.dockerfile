FROM node:14

# Set working directory
WORKDIR /app

# Install necessary tools
RUN apt update && \
  apt install -y \
    python3-pip \
    nfs-common \
    git \
    build-essential \
    binutils \
    curl \
    pkg-config \
    libssl-dev \
    gcc

# Install Rust
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain nightly
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

# Configure the shell for Rust
RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

# Set environment variables for cargo
ENV PATH="/root/.cargo/bin:${PATH}"

# Install botocore
RUN pip3 install botocore

# Clone and build amazon-efs-utils
RUN git clone https://github.com/aws/efs-utils /efs-utils && \
  cd /efs-utils && \
  ./build-deb.sh && \
  apt install -y ./build/amazon-efs-utils*deb

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 8800

# Start the application
CMD ["npm", "start"]
