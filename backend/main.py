from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Enable CORS so the React frontend can communicate with the FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    return Response(content=b"", media_type="image/x-icon")

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Kahn's Algorithm for Directed Acyclic Graph (DAG) validation
    in_degree = {node.id: 0 for node in pipeline.nodes}
    adj_list = {node.id: [] for node in pipeline.nodes}

    for edge in pipeline.edges:
        if edge.source in adj_list and edge.target in in_degree:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
            
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0

    while queue:
        current = queue.pop(0)
        visited_count += 1
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If the number of visited nodes equals the total number of nodes, it is a DAG
    is_dag = visited_count == num_nodes
                    
    return PipelineResponse(num_nodes=num_nodes, num_edges=num_edges, is_dag=is_dag)
