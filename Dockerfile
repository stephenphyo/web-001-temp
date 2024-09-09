#==============#
# Docker Image #
#==============#
FROM node:18

#===========================#
# Set Environment Variables #
#===========================#
ENV APP_ENV dev

#=============#
# Expose Port #
#=============#
EXPOSE 9001


#==============================#
# Create App Working Directory #
#==============================#
WORKDIR /usr/src/app

#======================================================================================#
# Copy both 'package.json' and 'package-lock.json' are copied where available (npm@5+) #
#======================================================================================#
COPY package*.json ./

#==========================#
# Install App Dependencies #
#==========================#
RUN if [ "$APP_ENV" = "dev" ]; \
    # Development
    then npm install; \
    # Production
    else npm ci --omit=dev; \
    fi

#==================================#
# Copy and Bundle App Source Codes #
#==================================#
COPY . .

#==============#
# Run Commands #
#==============#

CMD if [ "$APP_ENV" = "dev" ]; \
    # Development
    then npm run dev; \
    # Production
    else npm start; \
    fi