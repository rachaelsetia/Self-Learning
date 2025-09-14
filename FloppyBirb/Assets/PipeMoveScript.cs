using UnityEngine;

public class PipeMoveScript : MonoBehaviour
{
    public float moveSpeed = 5;
    public float deadZone = -75;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.position += Vector3.left * moveSpeed * Time.deltaTime; // tbh idk why this one needs to be a 3-component vector
            // must multiply by time or else the speed will change based on framerate since Update() runs as fast as it can
            // don't need it for physics stuff though bc physics has its own clock

        if (transform.position.x < deadZone) {
            Debug.Log("Pipe Deleted");
            Destroy(gameObject);
        }
    }
}
