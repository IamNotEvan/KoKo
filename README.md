# KoKo
Koko: Learn American Sign Language With Machine Learning!

Inspiration
We discovered that free ASL courses were typically not interactive and this often lead to users losing interest quickly. While there are ASL courses that are interactive, these are usually paid courses. We looked to Duolingo, which offers highly interactive free lessons to users, and wondered how we could apply this to ASL.

What it does
This app essentially attempts to teach you sign language by going through a lesson similar to Duolingo, but instead of typing words which wouldn't work for ASL, we use the camera so that the user may upload a video of them performing the sign. This sign is then passed to the Gradio backend, which contains our model. This model reads the video frame by frame and predicts what sign the user attempted. This is then sent to the React front end, which verifies that it is in fact the correct word.

How we built it
The model we created using Tensorflow and OpenCV in a Jupyter Notebook. We had a list of words and we created 30 videos with each being 30 frames long for each word. Then we trained the model using the numpy arrays derived from these videos keypoints, which are on the right and left hands, the pose which tracks shoulders and elbows, and then a face mesh. We trained the model over ~500 epochs multiple times until we had a accuracy score of >70. Then the model was loaded into a Gradio instance, housed in Flask, which powered our backend.

Challenges we ran into
Originally, we had a model powered by a dataset of over 2000 words picked out, however the model that we derived from that data was incredibly inaccurate, even for the most simple words. So we instead created our own videos for it, which improved it drastically. However, as we kept adding words to the model we noticed that the accuracy decreased. This was due to many signs being a little too similar, for example hello and goodbye both involved raising your hand and keeping it straight, so they were often confused for one another. We solved this by changing the words used in our model to ones that were more unique.

getting model into front end

Accomplishments that we're proud of
We are proud of the fact that we were able to create our model from scratch. It was incredibly difficult but it was much more rewarding than downloading a model off of hugging face. We also created our own dataset, which lead to us actually learning some sign language despite having never tried before.

What we learned
As I said, we learned how to use Tensorflow, OpenCV, and Mediapipes in order to process videos for our model to read as numpy arrays. Another thing we learned was how to utilize our model using gradio which made it incredibly easy to get predictions from. The alternative was TensorflowJS which we had an extremely hard time using.

What's next for Koko
The plan for the future is to add more lessons with more words. Instead of making a larger model, it would be much faster for the client and much easier to make several models with a more limited vocabulary. This reduces the risk of it predicting the wrong word.
